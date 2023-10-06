// Function to convert a ReadableStream to a string
export async function streamToString(readableStream: ReadableStream) {
  const textDecoder = new TextDecoder();
  const reader = readableStream.getReader();
  let result = '';

  try {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break; // The stream has ended
      }

      result += textDecoder.decode(value);
    }

    return result;
  } finally {
    reader.releaseLock();
  }
}

export const convertToDecimal = (hexadecimalString: string) => {
  const n = hexadecimalString.replace("0x", "")
  return parseInt(n, 16);
}