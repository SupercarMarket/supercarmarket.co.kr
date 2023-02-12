const catchNoExist = (...lists: unknown[]) => {
  lists.forEach((list) => {
    if (list === undefined) throw new Error('No Exist Query or Data');
  });
};

export default catchNoExist;
