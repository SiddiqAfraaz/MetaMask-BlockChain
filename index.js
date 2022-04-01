import process from "process";
import minimist from "minimist";
import { Web3Storage, getFilesFromPath } from "web3.storage";

async function main() {
  const args = minimist(process.argv.slice(2));
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEIxZUU5NjNjM2E5ZmZDMGNkMkM0MTQwODQ2ODgzMjZhOTA3QTQxNzIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDg4MTE5NjQ3MTMsIm5hbWUiOiJNZXRhTWFzayJ9._KT-qC3M7MEO0BO33aiLbBjXwZgEhpz1J91NFb3NizI";

  if (args._.length < 1) {
    return console.error("Please supply the path to a file or directory");
  }

  const storage = new Web3Storage({ token });
  const files = [];

  for (const path of args._) {
    const pathFiles = await getFilesFromPath(path);
    files.push(...pathFiles);
  }

  console.log(`Uploading ${files.length} files`);
  const cid = await storeWithProgress(files, storage);
  console.log("Content added with CID:", cid);
  retrieveFiles(cid, storage);
}

async function retrieveFiles(cid, storage) {
  const client = storage;
  const res = await client.get(cid);
  console.log(`Got a response! [${res.status}] ${res.statusText}`);
  if (!res.ok) {
    throw new Error(`failed to get ${cid} - [${res.status}] ${res.statusText}`);
  }

  // unpack File objects from the response
  const files = await res.files();
  for (const file of files) {
    console.log(`${file.cid} -- ${file.path} -- ${file.size}`);
  }
}

async function storeWithProgress(files, storage) {
  // show the root cid as soon as it's ready
  const onRootCidReady = (cid) => {
    console.log("uploading files with cid:", cid);
  };

  // when each chunk is stored, update the percentage complete and display
  const totalSize = files.map((f) => f.size).reduce((a, b) => a + b, 0);
  let uploaded = 0;

  const onStoredChunk = (size) => {
    uploaded += size;
    const pct = totalSize / uploaded;
    console.log(`Uploading... ${100 - pct.toFixed(2)}% complete`);
  };

  // makeStorageClient returns an authorized Web3.Storage client instance
  const client = storage;

  // client.put will invoke our callbacks during the upload
  // and return the root cid when the upload completes
  return client.put(files, { onRootCidReady, onStoredChunk });
}

main();
