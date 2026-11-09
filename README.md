# KAFAHERO — Jelajah Ilmu KAFA Tahun 3

## Audit pakej sumber

Bank asal dikekalkan. Pemeriksaan data menunjukkan Ibadah mengandungi 35 item objektif dan 12 item subjektif (47 item, 60 markah); Aqidah mengandungi 60 objektif dan 20 subjektif (100 markah); Bahasa Arab, Adab dan Akhlak, Sirah, Jawi dan Tilawah masing-masing mengandungi 60 soalan objektif. Untuk enam fail JSON, tiada ID objektif berganda dikesan. Maklumat lama yang menyatakan Sirah dan Jawi sebagai kuiz contoh dalam jadual di bawah telah digantikan oleh data 60 soalan dalam pakej.

Semakan automatik bilangan dan struktur bukan pengesahan kandungan. Guru perlu menyemak semua jawapan, penggunaan Jawi DBP, ayat al-Quran, dan keselarasan dengan sukatan JAKIM sebelum digunakan dalam pengajaran atau penilaian. Modul Ibadah asal mempunyai format selain empat pilihan, termasuk padanan dan tempat kosong. Pemarkahan subjektif memerlukan semakan guru; pemilihan markah pada peranti tidak mengesahkan identiti guru.

Untuk menjalankan secara setempat, buka `index.html` atau gunakan pelayan statik pada akar folder. Pilih nama dan kelas pada laman utama; rekod adalah setempat pada pelayar dan tidak dilindungi kata laluan. Nama dan kelas yang sama berkongsi rekod, dan mod tetamu berkongsi rekod tetamu; gunakan profil berlainan untuk murid berlainan dan jangan anggap ia akaun peribadi selamat.

Pakej laman web **satu repositori GitHub Pages** mengandungi tujuh subjek. Murid memilih mana-mana subjek tanpa mengikut urutan. Markah setiap subjek dikemas kini selepas semakan jawapan individu dan dipaparkan berasingan di homepage.

## Status modul (9 November 2026)

| Subjek | Bentuk latihan | Markah maksimum |
|---|---|---:|
| Ibadah | Kuiz asal; objektif dan subjektif | 60 |
| Aqidah | 60 objektif + 20 subjektif | 100 |
| Bahasa Arab | 60 objektif dan glosari | 60 |
| Adab dan Akhlak | 60 objektif | 60 |
| Sirah | Kuiz contoh | 9 |
| Jawi | Kuiz contoh | 9 |
| **Tilawah al-Quran** | **60 objektif pelbagai aras** | **60** |

## Kemas kini Tilawah 60 soalan

- `tilawah-al-quran/index.html`: halaman interaktif dengan **60 soalan** dan data JSON terbenam untuk mod tanpa pelayan.
- `tilawah-al-quran/questions.json`: salinan bank soalan yang boleh diaudit; **ubah kedua-dua fail** jika mengedit soalan.
- `assets/js/tilawah-quiz.js`: enjin semakan satu demi satu, kemajuan dan markah selepas setiap soalan, penapis aras dan empat tab topik.
- `assets/css/tilawah.css`: gaya Jawi responsif.
- `assets/js/kafahero.js` dan `index.html`: kemas kini had markah Tilawah 30 kepada **60** dan paparan empat pecahan markah.
- Soalan: **6 Tilawah/adab, 20 Hafazan, 18 Tajwid, 16 Kefahaman**. Aras: **20 mudah, 25 sederhana, 15 mencabar**.
- Empat surah hafazan/kefahaman: **al-Ma'un, Quraisy, al-Fil dan al-Humazah**. Tajwid: **nun/mim bersabdu (ghunnah), qalqalah**. Tilawah: Juzuk 1–5, adab, bimbingan talaqqi musyafahah.
- **Semakan ini bertulis sahaja.** Bacaan/ hafazan lisan sebenar dinilai oleh guru. Tiada pemarkahan audio atau bacaan automatik.
- Penyimpanan `localStorage` berkunci mengikut profil murid. **Versi kunci Tilawah baharu** digunakan supaya jawapan lama modul Tilawah 30 markah tidak bercampur dengan latihan 60 markah. Rekod subjek lain tidak dipadam.

## Menyiarkan ke GitHub Pages

1. Ekstrak fail ZIP.
2. Muat naik semua fail dan folder ke akar repositori GitHub KAFAHERO sedia ada. Pastikan `index.html` di akar dan `tilawah-al-quran/index.html` dalam folder subjek.
3. Pada **Settings → Pages**, gunakan *Deploy from branch* → `main` → `/(root)`.
4. Buka homepage melalui pautan GitHub Pages. Pilih nama murid, kelas, kemudian klik **Tilawah al-Quran**.
5. Murid boleh masuk ke mana-mana topik dan menekan **Semak jawapan** pada setiap soalan. Markah Tilawah muncul segera pada homepage.

## Nota kurikulum dan sumber

- Buku AnyFlip yang diberikan: [(T3) Tilawah Al-Quran (JAKIM)](https://anyflip.com/hgrab/qaba/basic) — halaman dalaman AnyFlip **tidak dapat diakses sepenuhnya** melalui sumber yang tersedia. Oleh itu bank soalan disemak terhadap sukatan KAFA 2.0 JAKIM dan bahan sokongan Tahun 3 yang tersedia, bukan semakan halaman demi halaman buku.
- [Buku Sukatan Pelajaran KAFA JAKIM 2.0](https://www.islam.gov.my/ms/e-penerbitan/2164-buku-sukatan-pelajaran-kafa-jakim-2-0)
- [JAKIM Smart Murabbi Tahun 3](https://smartmurabbi.islam.gov.my/courses/tilawah-al-quran-tahun-3)
- Semakan teks surah: [al-Ma'un](https://quran.com/ms/al-maun), [Quraisy](https://quran.com/ms/quraysh), [al-Fil](https://quran.com/ms/al-fil), [al-Humazah](https://quran.com/ms/al-humazah).
- **Ini set latihan KAFAHERO**, bukan kertas ujian rasmi atau pengesahan format khusus peperiksaan KAFA Negeri Perak. Ejaan Jawi berpandukan amalan DBP, namun belum disemak/disahkan oleh pihak DBP bagi setiap perkataan.

## Penyimpanan data

Semua markah disimpan pada pelayar/peranti tempatan. Ia bukan rekod peperiksaan rasmi. Markah **tidak dikumpulkan melalui internet**. Untuk guru melihat markah pada semua telefon murid, perlu sambungan pangkalan data seperti Google Sheets + Apps Script.

## Fail dan folder asas

```text
index.html
assets/css/
assets/js/
ibadah/index.html
aqidah/index.html
aqidah/questions.json
bahasa-arab/index.html
bahasa-arab/questions.json
adab-akhlak/index.html
adab-akhlak/questions.json
sirah/index.html
jawi/index.html
tilawah-al-quran/index.html
tilawah-al-quran/questions.json
LIPUTAN_TILAWAH.md
```


## Kemas kini Jawi Tahun 3 – 60 soalan (9 Nov 2026)
- `jawi/index.html` – kuiz interaktif 60 soalan; semakan terus, pilihan bebas, penerangan jawapan.
- `jawi/questions.json` – bank 60 soalan berasingan untuk audit/penyuntingan.
- `assets/js/jawi-quiz.js`, `assets/css/jawi.css` – logik semakan dan reka letak.
- `assets/js/kafahero.js` / `index.html` – markah Jawi kini /60, Sirah kekal demo.
- Agihan: 20 mudah, 25 sederhana, 15 mencabar. Subtopik: awalan 10, akhiran 8, apitan 8, diftong/vokal 10, kata ganda 10, serapan Arab 7, serapan Inggeris 7.
- Sukatan dirujuk: KAFA JAKIM 2.0 Tahun 3. Pautan AnyFlip khusus tidak dapat dibaca sepenuhnya; tiada dakwaan audit setiap halaman buku.
- Sumber kaedah DBP kata ganda: https://prpm.dbp.gov.my/Cari1?d=175768&keyword=Jawi+II
- Rekod disimpan pada localStorage peranti (tiada pangkalan data berpusat).


## Kemas kini Sirah Tahun 3 — 60 soalan (9 Nov 2026)
- `sirah/index.html`: kuiz Jawi 60 objektif, 4 pilihan, 6 topik, maklum balas selepas semakan.
- `sirah/questions.json`: bank soalan boleh sunting/audit.
- `assets/js/sirah-quiz.js`, `assets/css/sirah.css`: fungsi dan paparan responsif.
- `assets/js/kafahero.js`, `index.html`: kad Sirah 60 markah, Jawi 60 markah (pembetulan paparan lama).
- Agihan: 20 mudah, 25 sederhana, 15 mencabar.
- Rekod setempat mengikut identiti murid; tiada penyegerakan peranti / Google Sheets.
- Rujukan: sukatan KAFA JAKIM 2.0 dan nota guru berkaitan keluarga, kenabian dan Khadijah. Halaman buku AnyFlip tidak dapat dicapai sepenuhnya.


## Kemas kini Sirah Tahun 3 — 60 soalan (9 Nov 2026)
- `sirah/index.html`: kuiz Jawi 60 objektif, 4 pilihan, 6 topik, maklum balas selepas semakan.
- `sirah/questions.json`: bank soalan boleh sunting/audit.
- `assets/js/sirah-quiz.js`, `assets/css/sirah.css`: fungsi dan paparan responsif.
- `assets/js/kafahero.js`, `index.html`: kad Sirah 60 markah, Jawi 60 markah (pembetulan paparan lama).
- Agihan: 20 mudah, 25 sederhana, 15 mencabar.
- Rekod setempat mengikut identiti murid; tiada penyegerakan peranti / Google Sheets.
- Rujukan: sukatan KAFA JAKIM 2.0 dan nota guru berkaitan keluarga, kenabian dan Khadijah. Halaman buku AnyFlip tidak dapat dicapai sepenuhnya.


## Kemas kini Sirah Tahun 3 — 60 soalan (9 Nov 2026)
- `sirah/index.html`: kuiz Jawi 60 objektif, 4 pilihan, 6 topik, maklum balas selepas semakan.
- `sirah/questions.json`: bank soalan boleh sunting/audit.
- `assets/js/sirah-quiz.js`, `assets/css/sirah.css`: fungsi dan paparan responsif.
- `assets/js/kafahero.js`, `index.html`: kad Sirah 60 markah, Jawi 60 markah (pembetulan paparan lama).
- Agihan: 20 mudah, 25 sederhana, 15 mencabar.
- Rekod setempat mengikut identiti murid; tiada penyegerakan peranti / Google Sheets.
- Rujukan: sukatan KAFA JAKIM 2.0 dan nota guru berkaitan keluarga, kenabian dan Khadijah. Halaman buku AnyFlip tidak dapat dicapai sepenuhnya.

