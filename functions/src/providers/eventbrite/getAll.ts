const rp = require('request-promise-native');

const getAll = async (url: string, bearer: string, token: string, items?: any[], continuation?: string) => {
  const response = JSON.parse(await rp
    .get(continuation ? `${url}?continuation=${continuation}` : url)
    .auth(null, null, true, bearer));
  
  if (response.pagination.has_more_items && response.pagination.continuation) {
    return getAll(
      url,
      bearer,
      token,
      (items ? [...items, ...response[token]] : response[token]),
      response.pagination.continuation
    );
  } else {
    return items ? [...items, ...response[token]] : response[token];
  }
}

export default getAll;