const renderConent = (args: {
  mantra: string;
  bpm: string;
  count: string;
  activeSection: Element;
}) => {
  const html = `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');

      #conditioner-form {
        background: #ff319b;
        border-radius: 8px;
        padding: 8px;
        margin: 8px;
        width: calc(100% - 16px);
        display: flex;
        flex-direction: column;
        gap: 12px;
        font-weight: semibold;

        span {
          color: white;
        }

        input {
          width: 100%;
          padding: 4px;
          border: none;
          margin: 4px 0px 0px 0px;
          border-radius: 4px;
          background: #ffcef1;
        }

        button {
          background: white;
          border-radius: 8px;
          border: none;
          padding: 8px;
          text-align: center;
          margin: 8px 0px 0px 0px;
          color: #ff319b;
          font-size: 1.2rem;
          font-family: "Pacifico", serif;
          font-weight: 400;
          font-style: normal;
          cursor: pointer;

          :hover {
            background: #ffcef1;
          }
        }
      }
    </style>
    <form id="conditioner-form">
      <label><span>Mantra</span><input name="mantra" type="text" value="${args.mantra}" /></label>
      <label><span>BPM</span><input name="bpm" type="number" value="${args.bpm}" /></label>
      <label><span>Per Picture</span><input name="count" type="number" value="${args.count}" /></label>
      <label><span>Drive Folder</span><input name="folder" type="text" value="Orgasm Diet" /></label>
      <button type="submit">Open Conditioner</button>
    </form>
  `;
  const el = document.createElement("div");
  el.innerHTML = html;
  args.activeSection.appendChild(el);

  const form = args.activeSection.querySelector("form");
  if (!form) {
    throw new Error("Created form but could not find it");
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const formObj = Object.fromEntries(formData);
    const url = `https://drive.google.com/drive/my-drive?conditioner=${encodeURIComponent(JSON.stringify(formObj))}`;
    window.open(url, "_blank")?.focus();
  });
};

const shouldRender = () => {
  if (document.querySelector("#conditioner-form")) {
    return;
  }

  const activeSection = document.querySelector(
    '.form-all > .form-section.page-section[style=""]',
  );
  if (!activeSection) {
    return;
  }

  const innerHtml = activeSection.innerHTML;
  const mantra = innerHtml.match(/Your mantra is "([a-zA-Z0-9_ .]+)"/)?.[1];
  const bpm = innerHtml.match(/set your metronome to ([0-9]+)/)?.[1];
  const count = innerHtml.match(/next picture after ([0-9]+)/)?.[1];
  if (!mantra || !bpm || !count) {
    return;
  }

  renderConent({
    mantra,
    bpm,
    count,
    activeSection,
  });
};

const createObserver = () => {
  const rootFormNode = document.querySelector(".form-all");
  if (!rootFormNode) throw new Error("No .form-all found");

  const observer = new MutationObserver(shouldRender);

  observer.observe(rootFormNode, {
    subtree: true,
    attributes: true,
  });
};

createObserver();
