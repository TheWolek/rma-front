const url = "http://localhost:3000";
export const getUrl = (uri) => `${url}${uri}`;

export const shelve = "/warehouse/shelve";
export const items = "/warehouse/items/";
export const itemsShelve = "/warehouse/items/shelve";
export const itemsChangeShelve = "/warehouse/items/changeShelve";
export const spareparts = "/warehouse/spareparts";
export const sparepartsCode = "/warehouse/spareparts/code";
export const sparepartsOrdersEdit = "/warehouse/spareparts/orders/edit";
export const sparepartsOrdersFind = "/warehouse/spareparts/orders/find";
export const sparepartsOrdersItems = "/warehouse/spareparts/orders/items";
export const sparepartsOrdersItemsCodes =
  "/warehouse/spareparts/orders/items/codes";
export const sparepartsOrders = "/warehouse/spareparts/orders";
export const sparepartsCategories = "/warehouse/spareparts/categories";
export const sparepartsAdd = "/warehouse/spareparts/add";
export const sparepartsSuppliers = "/warehouse/spareparts/suppliers";
export const sparepartsStatuses = "/warehouse/spareparts/statuses";
export const rma = "/rma";
export const rmaCreate = "/rma/create";
export const rmaWaybills = "/rma/waybills";
export const rmaRegister = "/rma/register";
export const rmaChangeState = "/rma/changeState";
export const rmaComments = "/rma/comments";
export const rmaComment = "/rma/comment";
export const rmaSpareparts = "/rma/spareparts";
export const rmaSparepartsUse = "/rma/spareparts/use";
