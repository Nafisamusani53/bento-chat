export const checkPassword = (password: string): boolean => {
  if (!password) return false;

  // check length
  if (password.length < 8) return false;

  // check lowercase
  if (!/[a-z]/.test(password)) return false;

  // check uppercase
  if (!/[A-Z]/.test(password)) return false;

  // check number
  if (!/\d/.test(password)) return false;

  // check symbol
  if (!/[^A-Za-z0-9]/.test(password)) return false;

  return true;
};


// export const extractFilePathFromUrl = (publicUrl, bucketName) => {
//   const prefix = `/storage/v1/object/public/${bucketName}/`;
//   const parts = publicUrl.split(prefix);
//   return parts[1]; // this is your file path
// }

export const extractFilePathFromUrl = (
  publicUrl: string,
  bucketName: string
): string | undefined => {
  const prefix = `/storage/v1/object/public/${bucketName}/`;
  const parts = publicUrl.split(prefix);
  return parts[1];
};


// export const convertDate = (date) => {
//   const newDate = new Date(date);

//   const options = { hour: 'numeric', minute: '2-digit', hour12: true };
//   let timeString = newDate.toLocaleTimeString('en-US', options);
//   timeString = timeString.replace(/AM|PM/, match => match.toLowerCase());
//   return timeString;
// }

export const convertDate = (date: string | Date): string => {
  const newDate = new Date(date);

  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };

  let timeString = newDate.toLocaleTimeString('en-US', options);
  return timeString.replace(/AM|PM/, match => match.toLowerCase());
};
