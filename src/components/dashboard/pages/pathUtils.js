export function getGenericPaths(itemName) {
  return {
    itemPath: `/dashboard/${itemName}`,
    getSuccessPath: (pk) => `/dashboard/${itemName}/view/${pk}`,
    updatePath: (pk) => `/dashboard/${itemName}/update/${pk}`,
    getPostEndPoint: `/dashboard/${itemName}/`,
    getDetailEndPoint: (pk) => `/dashboard/${itemName}/${pk}`,
  };
}

export function getEEPaths(itemName, childItemName, parentName) {
  return {
    parentName: parentName,
    itemPath: `/dashboard/${itemName}`,
    getSuccessPath: (pk) => `/dashboard/${itemName}/view/${pk}`,
    parentPaths: {
      updatePath: (pk) => `/dashboard/${itemName}/update/${pk}`,
      getPostEndPoint: `/dashboard/${itemName}/`,
      getDetailEndPoint: (pk) => `/dashboard/${itemName}/${pk}`,
    },
    childPaths: {
      itemPath: `/dashboard/${childItemName}`,
      updatePath: (pk) => `/dashboard/${childItemName}/update/${pk}`,
      getPostEndPoint: `/dashboard/${childItemName}/`,
      getDetailEndPoint: (pk) => `/dashboard/${childItemName}/${pk}`,
    },
  };
}
