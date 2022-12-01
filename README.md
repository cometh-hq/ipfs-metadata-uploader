# IPFS Metadata Uploader

## Purpose

With ERC721 or ERC1155 assets, you usually need to upload your designs and
metadata files to IPFS.

It means that your metadata files need to reference an IPFS link of the
associated image. \
Doing this manually is a tedious process and this tool enables you to
automate all the painful manual work you'd have to do otherwise.

It offers both templating features for ease of use, but also uploads to IPFS
gateways and pinning services.

### Bonus

This tool can optionally resize your images to make them smaller and better
suited for NFT marketplaces.

## Usage

Fork this repository and in this forked repository, add your images in
`assets/images` folder and your metadata files in `assets/metadata` folder.

If you want a metadata file to reference a picture named `duck`, simply use
this syntax in your metadata file: `"image": "{{{duck}}}"`.

The name between `{{{` and `}}}` will be replaced by the IPFS link of the
uploaded image. 

For [nft.storage](https://nft.storage), you'll need to set a `NFT_STORAGE_TOKEN` environment variable and [fill it with an API key](https://nft.storage/manage/).

Install repository dependencies: `yarn install`.

Then you only need to run `yarn ipfs:run`. \
This should process the images, the metadata files and upload both as two
separate "folders" in IPFS and pin them. \
Lastly, the script will output in the console the base URI you should use
for your NFTs contract.

## IPFS Pinning Services

* [nft.storage](https://nft.storage)
* TODO: [Piñata](https://pinata.cloud)
* TODO: [filebase](https://filebase.com)