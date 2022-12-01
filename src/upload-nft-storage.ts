import { NFTStorage } from 'nft.storage';
import { filesFromPath } from 'files-from-path';
import path from 'path';

const uploadToNftStorage = async (): Promise<string> => {
	const nftStorage = new NFTStorage({ token: process.env.NFT_STORAGE_TOKEN ?? '' });
	// upload images as an IPFS folder to Nft.storage
	console.log('Uploading images to Nft.storage...');
	let cid = await nftStorage.storeDirectory(filesFromPath('./output/assets/images', {
		pathPrefix: path.resolve('./output/assets/images'),
		hidden: false,
	}));
	// console.debug('IPFS Images Folder CID:', cid);
	// upload metadata files as an IPFS folder to Nft.storage
    console.log('Uploading metadata files to Nft.storage...');
	cid = await nftStorage.storeDirectory(filesFromPath('./output/assets/metadata', {
		pathPrefix: path.resolve('./output/assets/metadata'),
		hidden: false,
	}));
	// console.debug('IPFS Metadata Folder CID:', cid);
    return cid;
};

export { uploadToNftStorage };
