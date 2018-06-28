// @flow
import fs from 'fs';
import path from 'path';
import MdnCompatData from './MdnCompatDataProvider';
import MsApiCatalogProvider from './MsApiCatalogProvider';

export type RecordType = {
  protoChain: Array<string>,
  protoChainId: string
};

export default async function Providers() {
  const records = await Promise.all([
    MdnCompatData().filter(record => !record.protoChain.includes('RegExp')),
    MsApiCatalogProvider().filter(record => !record.protoChain.includes('RegExp'))
  ]);
  const flattenedRecords = [...records[0], ...records[1]];
  const file = path.join(__dirname, '..', '..', 'meta.json');
  await fs.promises.writeFile(file, JSON.stringify(flattenedRecords));
  return flattenedRecords;
}
