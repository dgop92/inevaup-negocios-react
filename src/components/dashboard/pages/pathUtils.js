export function getGenericPaths(itemName) {
  return {
    itemPath: `/dashboard/${itemName}`,
    updatePath: (pk) => `/dashboard/${itemName}/update/${pk}`,
    getPostEndPoint: `/dashboard/${itemName}/`,
    getDetailEndPoint: (pk) => `/dashboard/${itemName}/${pk}`,
  };
}
