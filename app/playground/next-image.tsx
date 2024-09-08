import Image from "next/image";

export const NextImage = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <Image
        src="/downloads/logo/shimano-rm_nZkuGTj.png"
        alt={`company logo`}
        width={100}
        height={100}
        className="rounded-lg self-center "
      />
      {/* not working */}
      <Image
        src="/../../downloads/shimano-rm_nZkuGTj.png"
        alt={`company logo`}
        width={100}
        height={100}
        className="rounded-lg self-center "
      />
    </div>
  );
};
