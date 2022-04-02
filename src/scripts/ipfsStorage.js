import { Web3Storage } from "web3.storage/dist/bundle.esm.min.js";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEIxZUU5NjNjM2E5ZmZDMGNkMkM0MTQwODQ2ODgzMjZhOTA3QTQxNzIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDg4MTE5NjQ3MTMsIm5hbWUiOiJNZXRhTWFzayJ9._KT-qC3M7MEO0BO33aiLbBjXwZgEhpz1J91NFb3NizI";

function makeStorageClient() {
  return new Web3Storage({ token: token });
}

export async function retrieveFile(cid) {
  const client = makeStorageClient();
  const res = await client.get(cid);
  console.log(`Got a response! [${res.status}] ${res.statusText}`);
  if (!res.ok) {
    throw new Error(`failed to get ${cid} - [${res.status}] ${res.statusText}`);
  }

  // unpack File objects from the response
  const files = await res.files();
  for (const file of files) {
    console.log(`${file.cid} -- ${file.path} -- ${file.size}`, file);
  }
  return files;
}

export async function storefile(files) {
  // show the root cid as soon as it's ready
  const onRootCidReady = (cid) => {
    console.log("uploading files with cid:", cid);
  };

  //   // when each chunk is stored, update the percentage complete and display
  //   const totalSize = files.map((f) => f.size).reduce((a, b) => a + b, 0);
  //   let uploaded = 0;

  //   const onStoredChunk = (size) => {
  //     uploaded += size;
  //     const pct = totalSize / uploaded;
  //     console.log(`Uploading... ${100 - pct.toFixed(2)}% complete`);
  //   };

  //   // makeStorageClient returns an authorized Web3.Storage client instance
  //   const client = storage;

  //   // client.put will invoke our callbacks during the upload
  //   // and return the root cid when the upload completes
  //   return await client.put(files, { onRootCidReady, onStoredChunk });

  const client = makeStorageClient();
  const cid = await client.put(files, { onRootCidReady: onRootCidReady });
  console.log("stored files with cid:", cid);
  return cid;
}

export async function listUploads() {
  const client = makeStorageClient();
  for await (const upload of client.list()) {
    console.log(
      `${upload.name} - cid: ${upload.cid} - size: ${upload.dagSize}`
    );
  }
}

export async function checkStatus(cid) {
  const client = makeStorageClient();
  const status = await client.status(cid);
  console.log(status);
  if (status) {
    return status;
  }
}
