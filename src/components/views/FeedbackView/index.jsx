import { feedbackAnimation } from '@/assets/images/images';
import reviewService from '@/services/review';
import { Button, Select, SelectItem, Textarea } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useState } from 'react';

export default function FeedbackView({ setToaster }) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // form
    const form = e.target;
    const formData = new FormData(form);

    const data = {
      name: '',
      review: formData.get('review'),
      description: formData.get('description'),
      image: '',
    };

    if (session) {
      data.name = session.user.name || session.user.fullname;
      data.image = session.user.image;
    }

    try {
      const result = await reviewService.addReview(data, session?.accessToken);
      console.log(result);
      if (result.status === 200) {
        setIsLoading(false);
        form.reset();
        setToaster({
          variant: 'susccess',
          message: 'Review successfully submitted',
        });
      }
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      setToaster({
        variant: 'error',
        message: 'Failed to submit review',
      });
    }
  };
  return (
    <section className="relative flex justify-center w-full h-max bg-gradient-to-b from-secondary to-primary px-12 overflow-hidden ">
      <div className="bg-gradient-to-b to-[#e562a8] from-purple-900 w-52 h-52 absolute top-12 left-52 rounded-full"></div>
      <div className="bg-[#e562a8] w-24 h-24 absolute top-52 left-52 rounded-full"></div>
      <div className="w-[992px] h-max bg-feedback rounded-xl my-20 pb-10">
        <div className="flex max-lg:flex-col-reverse max-md:items-center xlitems-start">
          <div className="p-8 min-[520px]:mb-2 min-[780px]:text-start text-center">
            <h1 className="text-primary max-sm:text-2xl max-lg:text-4xl lg:text-4xl font-pacifico leading-[3rem] tracking-wider max-[936px]:tracking-normal ">
              Bantu Kami dengan <br /> Masukkan Anda 😉
            </h1>
            <p className="text-xs md:text-sm font-normal text-slate-600 mt-2">
              Dukung kami dengan cara memberikan saran atau <br />
              kritikan supaya kami bisa berkembang.
            </p>
          </div>
          <div className="lg:w-[500px] sm:w-[400px] min-[780px]:absolute -top-32 -right-8">
            <Image
              src={feedbackAnimation}
              width={500}
              height={100}
              alt="loves.png"
            />
          </div>
        </div>

        <div className="px-4 lg:mt-40">
          <form
            className="w-full"
            onSubmit={handleSubmit}
          >
            <div className="flex max-[600px]:flex-col items-end gap-4">
              <div className="flex flex-col justify-start w-full">
                <label className="text-xs">Seberapa Mudah Melakuan Pendaftaran Online?</label>
                <div className="bg-white flex justify-start items-center border-[1px]  border-slate-400 rounded-lg mt-2">
                  <i className="bx bxs-time pl-4"></i>
                  <Select
                    name="review"
                    size="lg"
                    placeholder="Pilih Salah Satu"
                    className="w-full px-1.5 outline-none text-sm"
                    required
                  >
                    <SelectItem
                      className="bg-white border-[1px] border-slate-400 py-3 rounded-lg"
                      key={'sangat mudah'}
                    >
                      Sangat Mudah
                    </SelectItem>
                    <SelectItem
                      className="bg-white border-[1px] border-slate-400 py-3 rounded-lg"
                      key={'mudah'}
                    >
                      Mudah
                    </SelectItem>
                    <SelectItem
                      className="bg-white border-[1px] border-slate-400 py-3 rounded-lg"
                      key={'cukup sulit'}
                    >
                      Cukup Sulit
                    </SelectItem>
                    <SelectItem
                      className="bg-white border-[1px] border-slate-400 py-3 rounded-lg"
                      key={'sulit'}
                    >
                      Sulit
                    </SelectItem>
                    <SelectItem
                      className="bg-white border-[1px] border-slate-400 py-3 rounded-lg"
                      key={'sanget sulit'}
                    >
                      Sanget Sulit
                    </SelectItem>
                  </Select>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <Textarea
                name="description"
                placeholder="Berikan Saran Atau Kritik Anda"
                size="lg"
                className="border-[1px] border-slate-400 rounded-lg bg-white"
                required
              />
            </div>
            <div className="flex justify-end mt-5">
              <Button
                size="lg"
                color="secondary"
                type="submit"
                className="rounded text-white font-bold"
              >
                {isLoading ? 'Loading...' : 'Kirim'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
