const AddTask = () => {
  // პრიორიტეტების, სტატუსის, დეპარტამენტების, ინფუთებში უნდა იყოს ბექიდან წამოსული მონაცემები
  // და იხსნებოდეს მოდალი დაჭერაზე ასევე, ტექსტის დაჭერაზე ინფუთში უნდა ეწერებოდეს ავტომატურად
  // ამ ეტაპზე პასუხისმგებელ თანამშრომლებს ვერ დავამატებთ რადგან არ გვაქვს შექმნილი თანამშრომლები
  // ამასაც ჩვეულებრივად თანამშრომლებზე GET რექუესტით წამოვიყებთ და იგივენაირად დავარენდერებთ ინფუთში
  // დასამატებელია ვალიდაციები.
  return (
    <div className="py-10 flex flex-col gap-[30px]">
      <h1 className="text-[34px] text-[#212529] font-semibold">
        შექმენი ახალი დავალება
      </h1>
      <div className="h-[804px] w-full border-[0.3px] py-17 px-14 border-[#DDD2FF] bg-[#FBF9FFA6] rounded-[4px] flex flex-col">
        <div className="w-[81%] h-full flex flex-col justify-between">
          <div className="flex gap-40 select-none">
            <div className="flex flex-col gap-14 flex-1">
              <div className="flex flex-col">
                <label className="text-[16px] font-bold text-[#343a40] pb-[6px]">
                  სათაური*
                </label>
                <input
                  type="text"
                  className="border border-[#dee2e6] text-[14px] text-[#0d0f10] font-light p-3.5 rounded-[5px]"
                />
                <p className="text-[10px] text-[#6C757D]  pt-[4px]">
                  მინიმუმ 2 სიმბოლო
                </p>
                <p className="text-[10px] text-[#6C757D]">
                  მაქსიმუმ 255 სიმბოლო
                </p>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="description"
                  className="text-[16px] font-bold text-[#343a40] pb-[6px]"
                >
                  აღწერა*
                </label>
                <textarea
                  id="description"
                  className="border border-[#dee2e6] text-[14px] text-[#0d0f10] font-light p-3.5 rounded-[5px] h-[133px] resize-none leading-1.5"
                />
                <p className="text-[10px] text-[#6C757D]  pt-[4px]">
                  მინიმუმ 2 სიმბოლო
                </p>
                <p className="text-[10px] text-[#6C757D]">
                  მაქსიმუმ 255 სიმბოლო
                </p>
              </div>

              <div className="flex gap-8">
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-[16px] font-bold text-[#343a40]">
                    პრიორიტეტი*
                  </label>
                  <input
                    type="text"
                    className="border border-[#dee2e6] text-[14px] text-[#0d0f10] font-light p-3.5 rounded-[5px]"
                  />
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-[16px] font-bold text-[#343a40]">
                    სტატუსი*
                  </label>
                  <input
                    type="text"
                    className="border border-[#dee2e6] text-[14px] text-[#0d0f10] font-light p-3.5 rounded-[5px]"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-14 flex-1 justify-between">
              <div className="flex flex-col">
                <label className="text-[16px] font-bold text-[#343a40] pb-[6px]">
                  დეპარტამენტი*
                </label>
                <input
                  type="text"
                  className="border border-[#dee2e6] text-[14px] text-[#0d0f10] font-light p-3.5 rounded-[5px]"
                />
              </div>
              <div className="flex flex-col pb-20">
                <label className="text-[16px] font-bold text-[#343a40] pb-[6px]">
                  პასუხისმგებელი თანამშრომელი*
                </label>
                <input
                  type="text"
                  className="border border-[#dee2e6] text-[14px] text-[#0d0f10] font-light p-3.5 rounded-[5px]"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[16px] font-bold text-[#343a40] pb-[6px]">
                  დედლაინი*
                </label>
                <input
                  type="date"
                  className="border w-[50%] cursor-pointer border-[#dee2e6] text-[14px] text-[#0d0f10] font-light p-3.5 rounded-[5px]"
                />
              </div>
            </div>
          </div>
          <div className=" w-full flex justify-end">
            <button className="bg-[#8338ec] cursor-pointer duration-100 hover:bg-[#B588F4] rounded-[5px] text-white px-5 py-2.5 text-[18px]">
              დავალების შექმნა
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
