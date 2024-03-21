import App from '../app';
import Condition from '../constants/Condition';
import storage from '../storage';
import LOCAL_STORAGE_KEY from '../constants/LocalStorageKey';
import { CategoryType, Restaurant as RestaurantType } from '../types';

import FormItem from './formItem/FormItem';
import Modal from './modal/Modal';
import DOM from '../utils/DOM';

import { Button, ButtonProps } from './tag/button';
import { CaptionProps } from './tag/caption';
import { Input, InputProps } from './tag/input';
import { LabelProps } from './tag/label';
import { OptionProps } from './tag/option';
import { Select, SelectProps } from './tag/select';
import { TextArea, TextAreaProps } from './tag/textarea';
import Restaurant from './restaurant/Restaurant';
import TabPane from './TabPane';

const { REGULAR_EXPRESSION } = Condition;
const { MATZIP_DATA } = LOCAL_STORAGE_KEY;
const { $ } = DOM;

class RestaurantForm extends HTMLFormElement {
  private modal: Modal;

  constructor(modal: Modal) {
    super();
    this.id = 'restaurant-form';
    this.submitButton = null;
    this.modal = modal;
    this.createElements();
    this.listenSubmitEvent();
  }

  createElements() {
    this.createCategoryField();
    this.createRestaurantNameField();
    this.createDistanceField();
    this.createDescriptionField();
    this.createLinkField();
    this.createButtons();
    this.setupValidation();
  }

  createCategoryField() {
    const label: LabelProps = {
      htmlFor: 'category',
      classname: 'text-caption',
      text: '카테고리',
    };
    const options: OptionProps[] = [
      { value: '', text: '선택해 주세요' },
      { value: '한식', text: '한식' },
      { value: '중식', text: '중식' },
      { value: '일식', text: '일식' },
      { value: '양식', text: '양식' },
      { value: '아시안', text: '아시안' },
      { value: '기타', text: '기타' },
    ];
    const select: SelectProps = {
      name: 'category',
      id: 'category',
      required: true,
      options: options,
    };

    this.appendChild(
      new FormItem({
        required: true,
        label,
        select,
      }),
    );
  }

  createRestaurantNameField() {
    const label: LabelProps = {
      htmlFor: 'name',
      classname: 'text-caption',
      text: '이름',
    };

    const input: InputProps = {
      type: 'text',
      name: 'name',
      id: 'name',
      required: true,
    };

    this.appendChild(
      new FormItem({
        required: true,
        label,
        input,
      }),
    );
  }

  createDistanceField() {
    const label: LabelProps = {
      htmlFor: 'distance',
      classname: 'text-caption',
      text: '거리(도보 이동 시간)',
    };
    const options: OptionProps[] = [
      { value: '', text: '선택해 주세요' },
      { value: '5', text: '5분 내' },
      { value: '10', text: '10분 내' },
      { value: '15', text: '15분 내' },
      { value: '20', text: '20분 내' },
      { value: '30', text: '30분 내' },
    ];
    const select: SelectProps = {
      name: 'distance',
      id: 'distance',
      required: true,
      options,
    };

    this.appendChild(
      new FormItem({
        required: true,
        label,
        select,
      }),
    );
  }

  createDescriptionField() {
    const label: LabelProps = {
      htmlFor: 'description',
      classname: 'text-caption',
      text: '설명',
    };

    const textarea: TextAreaProps = {
      name: 'description',
      id: 'description',
      cols: 30,
      rows: 15,
    };

    const caption: CaptionProps = {
      classnames: ['help-text', 'text-caption'],
      text: '메뉴 등 추가 정보를 입력해 주세요.',
    };

    this.appendChild(
      new FormItem({
        required: false,
        label,
        textarea,
        caption,
      }),
    );
  }

  createLinkField() {
    const label: LabelProps = {
      htmlFor: 'link',
      classname: 'text-caption',
      text: '참고 링크',
    };

    const input: InputProps = {
      type: 'text',
      name: 'link',
      id: 'link',
      required: false,
      pattern: REGULAR_EXPRESSION.URL,
    };

    const caption: CaptionProps = {
      classnames: ['help-text', 'text-caption'],
      text: '매장 정보를 확인할 수 있는 링크를 입력해 주세요.',
    };
    this.appendChild(
      new FormItem({
        required: false,
        label,
        input,
        caption,
      }),
    );
  }

  createButtons() {
    const buttonContainer = document.createElement('div');
    buttonContainer.setAttribute('class', 'button-container');

    const cancelButton: ButtonProps = {
      type: 'reset',
      classnames: ['button', 'text-caption', 'modal--close'],
      varient: 'secondary',
      children: '취소하기',
      onClick: this.modal.toggleModal.bind(this.modal),
    };

    const submitButton: ButtonProps = {
      type: 'submit',
      classnames: ['button', 'text-caption', 'form-submit'],
      varient: 'primary',
      children: '추가하기',
      disabled: true,
    };

    this.submitButton = new Button(submitButton);
    buttonContainer.appendChild(new Button(cancelButton));
    buttonContainer.appendChild(this.submitButton);

    this.appendChild(buttonContainer);
  }

  getFormFields(): Array<Select | TextArea | Input> {
    const formFields = [...this.children].filter((children) =>
      children.className.includes('form-item'),
    );

    return formFields.map((field) => {
      const inputField = Array.from(field.children).find((child) => this.getInputField(child));
      return inputField as Select | TextArea | Input;
    });
  }

  private getInputField(element: Element): element is Select | TextArea | Input {
    return ['SELECT', 'TEXTAREA', 'INPUT'].includes(element.tagName);
  }

  updateButtonState() {
    const formFields = this.getFormFields();
    const allFieldsValid = formFields.every((field) => field.isValidate());

    if (allFieldsValid) {
      this.submitButton.removeAttribute('disabled');
    } else {
      this.submitButton.setAttribute('disabled', 'true');
    }
  }

  setupValidation() {
    const formFields = this.getFormFields();

    formFields.forEach((field) => {
      field.addEventListener('input', () => {
        this.updateButtonState();
      });
    });
  }

  listenSubmitEvent() {
    this.addEventListener('submit', (event) => {
      event.preventDefault();
      const formFields = this.getFormFields();
      const fieldValues = formFields.map((field) => field.getValue());

      const newRestaurant: RestaurantType = {
        id: `matzip${crypto.randomUUID().replace(/-/g, '')}`,
        category: fieldValues[0] as CategoryType,
        name: fieldValues[1],
        distance: Number(fieldValues[2]),
        introduction: fieldValues[3],
        link: fieldValues[4],
      };

      try {
        App.matzip.add(newRestaurant);
        storage.addData(MATZIP_DATA, newRestaurant);
        const tabPane = $<TabPane>('.tabpane');
        tabPane.showListAppend(new Restaurant(newRestaurant, false));
        this.reset();
        this.modal.toggleModal();
      } catch (error) {
        alert(error);
      }
    });
  }
}

customElements.define('restaurant-form', RestaurantForm, { extends: 'form' });

export default RestaurantForm;
