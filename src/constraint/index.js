import { eyeBall, general, lungs, pregnant, tooth } from "@/assets/images/images";

export const datas = [
    {
        name: 'Poli Mata',
        antrian: 60,
        image: eyeBall
    },
    {
        name: 'Poli Umum',
        antrian: 50,
        image: general
    },
    {
        name: 'Poli Gigi',
        antrian: 10,
        image: tooth
    },
    {
        name: 'Poli Penyakit Dalam',
        antrian: 80,
        image: lungs
    },
    {
        name: 'Poli Kandungan',
        antrian: 39,
        image: pregnant
    }
]

export const datasFlow = [
    {
        no: '01',
        keterangan: 'Daftarkan diri anda terlebih dahulu jika belum mempunyai akun link(https:\\bundaharapan.com\register).'
    },
    {
        no: '02',
        keterangan: 'Setelah daftar Anda akan dipindahkan ke halaman beranda, dan Anda bisa mengklik tombol AMBIL ANTRIAN.'
    },
    {
        no: '03',
        keterangan: 'Pilih Dokter sesuai dengan penyakit yang Anda rasakan, dan pilih jadwalnya.'
    },
    {
        no: '04',
        keterangan: 'Masukkan Daftar diri Anda mulai dari nama, alama, no telepon, dll.'
    },
    {
        no: '05',
        keterangan: 'Setelah nomor antrian keluar silahkan datang kurang dari jadwal yang sudah ditetapkan untuk ketepatan waktunya.'
    }
]