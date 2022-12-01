import { calculateImagesCIDs } from "./calculate-cids";
import { getAllFiles } from 'get-all-files';
import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { copySync } from "fs-extra";
import Mustache from "mustache";
import { uploadToNftStorage } from "./upload-nft-storage";
import sharp from 'sharp'; // TODO: uncomment if you want to resize original images
import fs from 'fs'; // TODO: uncomment if you want to resize original images

(async () => {

	// TODO: comment or delete if you want to resize original images
	copySync('./assets/images', './output/assets/images', { overwrite: true })

	// TODO: uncomment if you want to resize original images
	/*
	// scale down images to max 1000 px
	const images = await getAllFiles("./assets/images").toArray();
	mkdirSync('./output/assets/images', { recursive: true });
	await Promise.all(images.map((filePath: string) => {
		if (filePath.endsWith(".gif")) {
			// skip GIF files, usually animations as sharp produces scaled down files with higher file size
			fs.copyFileSync(filePath, `./output/${filePath}`);
		} else {
			console.log(`Resizing ${filePath}`);
			sharp(filePath, { animated: true, limitInputPixels: 100 * 4_000_000 })
				.resize(1000, undefined, { withoutEnlargement: true })
				.toFile(`./output/${filePath}`);
		}
	}));
	const sleep = (ms: number) => new Promise((resolve: any) => setTimeout(resolve, ms));
	await sleep(15_000);
	*/

	// compute CIDs for each NFT image
	await calculateImagesCIDs('./output/assets/images');

	// process metadata templates
	let cids: Object = require("../output/file-cids.json");
	cids = Object.fromEntries(Object.entries(cids).map(([key, value]) => [key, `ipfs://${value}`]));
	mkdirSync('./output/assets/metadata', { recursive: true });
	const files = await getAllFiles("./assets/metadata").toArray();
	files.forEach(async (filePath: string) => {
		const template = readFileSync(filePath, 'utf-8');
		const rendered = Mustache.render(template, cids);
		writeFileSync(`./output/${filePath}`, rendered, 'utf-8');
	});

	// prepare Nft.storage uploads
	const cid = await uploadToNftStorage();
	console.log(`For ERC1155 NFTs, use this base URI in your contracts: ipfs://${cid}/{id}.json`);
})();


