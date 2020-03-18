export const sortingHeaderByLowerCase = (data: any, sortHeaderId: string): string => {
  if (typeof data[sortHeaderId] === 'string') {
    return data[sortHeaderId].toLocaleLowerCase();
  }

  return data[sortHeaderId];
};
