# Stemulator - Open-source Music Demixer

This is currently just a pet project to enable AI-based music demixing without having to use a pay-to-play website.
Under the hood, Stemulator uses [facebook's demucs](https://github.com/facebookresearch/demucs) so it must
be installed (follow instructions in that repo to do so). This hasn't been packaged yet so to run the app,
simply clone the repo and in the main directory, run:
```
yarn build && yarn start
```

Note that this has only been tested on MacOS Sonoma. PRs are welcome if you'd like to add support for your system.

## Usage

Once it's running, drag the audio file you want to demix onto the drop zone (file explorer is coming soon):

<img width="995" alt="image" src="https://github.com/okalex/stemulator/assets/1102369/5ab94115-3cba-439a-9d85-1e8b4ecda832">

Then choose the model you want to use for processing (see model descriptions on the demucs page) and click "Process":

<img width="997" alt="image" src="https://github.com/okalex/stemulator/assets/1102369/fb50f842-ad5d-4400-be0a-4a5dc11d572a">

Once it's processed, you can preview the original song or any of the stems by clicking the corresponding button.
Additionally, you can click the copy button (to the right of the waveform) to copy to the clipboard and then
paste into your DAW. Or alternatively, you can grab the drag icon (farthest right) and drop it into your DAW.

<img width="995" alt="image" src="https://github.com/okalex/stemulator/assets/1102369/24d27c34-02c5-4755-8981-81257d600e27">
