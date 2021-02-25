export class SmileZone {
    static init() {
        const fragment = document.createDocumentFragment();
        const smileArea = document.createElement('div');
        smileArea.className = 'smile-area';
        fragment.append(smileArea);
        return fragment;
    }
}