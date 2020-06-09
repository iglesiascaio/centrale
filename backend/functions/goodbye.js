'use strict';

module.exports.handle = async event => {
  let gb = ["goodbye1","goodbye2","goodbye3"]
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: gb,
        input: event,
      },
      null,
      2
    ),
  };
};
