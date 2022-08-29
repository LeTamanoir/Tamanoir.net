export default function Links() {
  return (
    <main className="flex w-[50rem] justify-center mt-40">
      <ul className="text-base text-white">
        <li className="flex items-center mb-4">
          <img src="/images/emby.png" className="w-10 mr-4" />
          <a
            target="_blank"
            className="hover:underline"
            href="https://emby.tamanoir.net/"
          >
            emby
          </a>
        </li>
        <li className="flex items-center mb-4">
          <img src="/images/flood.png" className="w-10 mr-4" />
          <a
            target="_blank"
            className="hover:underline"
            href="https://flood.tamanoir.net/"
          >
            Flood client
          </a>
        </li>
      </ul>
    </main>
  );
}
