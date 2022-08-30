function getSelectors(path: any[]) {
  // 反转 + 过滤 + 映射 + 拼接
  return path
    .reverse()
    .filter((element: Document | (Window & typeof globalThis)) => {
      return element !== document && element !== window;
    })
    .map((element: { nodeName: string; id: any; className: any; }) => {
      console.log("element", element.nodeName);
      let selector = "";
      if (element.id) {
        return `${element.nodeName.toLowerCase()}#${element.id}`;
      } else if (element.className && typeof element.className === "string") {
        return `${element.nodeName.toLowerCase()}.${element.className}`;
      } else {
        selector = element.nodeName.toLowerCase();
      }
      return selector;
    })
    .join(" ");
}

export default function (pathsOrTarget: { parentNode: any; }) {
  if (Array.isArray(pathsOrTarget)) {
    return getSelectors(pathsOrTarget);
  } else {
    let path = [];
    while (pathsOrTarget) {
      path.push(pathsOrTarget);
      pathsOrTarget = pathsOrTarget.parentNode;
    }
    return getSelectors(path);
  }
}
