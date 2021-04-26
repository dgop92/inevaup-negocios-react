export function getGenericPaths(itemName) {
  return {
    itemPath: `/dashboard/${itemName}`,
    updatePath: (pk) => `/dashboard/${itemName}/update/${pk}`,
    getPostEndPoint: `/dashboard/${itemName}/`,
    getDetailEndPoint: (pk) => `/dashboard/${itemName}/${pk}`,
  };
}

export function getEEPaths(itemName, childItemName) {
  return {
    itemPath: `/dashboard/${itemName}`,
    parentPaths: {
      updatePath: (pk) => `/dashboard/${itemName}/update/${pk}`,
      getPostEndPoint: `/dashboard/${itemName}/`,
      getDetailEndPoint: (pk) => `/dashboard/${itemName}/${pk}`,
    },
    childPaths: {
      updatePath: (pk) => `/dashboard/${childItemName}/update/${pk}`,
      getPostEndPoint: `/dashboard/${childItemName}/`,
      getDetailEndPoint: (pk) => `/dashboard/${childItemName}/${pk}`,
    }
  };
}
