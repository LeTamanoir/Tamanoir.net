export default function Contact() {
  return (
    <main className="flex w-[50rem] justify-center mt-40">
      <ul className="text-base text-white leading-8">
        <li>
          Github :{" "}
          <a
            target="_blank"
            className="hover:underline"
            href="https://github.com/LeTamanoir"
          >
            LeTamanoir
          </a>
        </li>
        <li>
          Twitter :{" "}
          <a
            target="_blank"
            className="hover:underline"
            href="https://twitter.com/martin_sldg"
          >
            @martin_sldg
          </a>
        </li>
        <li>
          Email :{" "}
          <a
            target="_blank"
            className="hover:underline"
            href="mailto: martin.saldinger@gmail.com"
          >
            martin.saldinger@gmail.com
          </a>
        </li>
        <li>
          Discord :{" "}
          <button
            target="_blank"
            className="hover:underline"
            onClick={() => alert("Add me on discord : Le_Tamanoir#1772")}
          >
            Le_Tamanoir#1772
          </button>
        </li>
      </ul>
    </main>
  );
}
