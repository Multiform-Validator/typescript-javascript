const fs = require('fs');

// Assinatura PNG: [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]
const pngSignature = [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A];
const fakePNG = new Uint8Array([...pngSignature, ...new Array(100).fill(0)]); // 100 bytes extras vazios
fs.writeFileSync('fake.png', fakePNG);

// Assinatura GIF: [0x47, 0x49, 0x46, 0x38, 0x37, 0x61] (GIF89a) ou [0x47, 0x49, 0x46, 0x38, 0x37, 0x61] (GIF87a)
const gifSignature = [0x47, 0x49, 0x46, 0x38, 0x37, 0x61];
const fakeGIF = new Uint8Array([...gifSignature, ...new Array(100).fill(0)]); // 100 bytes extras vazios
fs.writeFileSync('fake87a.gif', fakeGIF);

// Assinatura GIF89a: [0x47, 0x49, 0x46, 0x38, 0x39, 0x61]
const gif89aSignature = [0x47, 0x49, 0x46, 0x38, 0x39, 0x61];
const fakeGIF89a = new Uint8Array([...gif89aSignature, ...new Array(100).fill(0)]); // 100 bytes extras vazios
fs.writeFileSync('fake89a.gif', fakeGIF89a);

// Assinatura JPEG: [0xFF, 0xD8, 0xFF]
const jpegSignature = [0xFF, 0xD8, 0xFF];
const fakeJPEG = new Uint8Array([...jpegSignature, ...new Array(100).fill(0)]); // 100 bytes extras vazios
fs.writeFileSync('fake.jpeg', fakeJPEG);