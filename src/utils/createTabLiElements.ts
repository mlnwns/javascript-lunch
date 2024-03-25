export const createTabLiElements = (
  tabItems: Record<string, string>[]
): string => {
  const liElements = tabItems.map((tabItem, index) => {
    const tabName = Object.keys(tabItem)[0]; 
    const tabContent = tabItem[tabName];
    const tabClass = index === 0 ? "tab-item tab-item-selected" : "tab-item";

    return `<li id="${tabName}" class="${tabClass}">${tabContent}</li>`;
  });

  return liElements.join("");
};
