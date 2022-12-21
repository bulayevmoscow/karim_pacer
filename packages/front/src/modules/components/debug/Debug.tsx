import style from "./Debug.module.scss";
import { Button } from "@modules/library/Button";
import { useEffect, useState } from "react";
import axios from "axios";

export const Debug = () => {
  const [data, setData] = useState("no data");
  const [body, setBody] = useState(JSON.stringify({ action: "ON", id: 1 }));
  const [url, setUrl] = useState("");

  useEffect(() => {
    const storage = window.localStorage.getItem("debug_req");
    if (storage) {
      const obj = JSON.parse(storage) as { body?: string; url?: string };
      setBody(obj.body ?? "");
      setUrl(obj.url ?? "");
    }
  }, []);
  return (
    <div className={style.settings}>
      <div className={style.settings_container}>
        <div className={style.settings_list}>
          <pre>{data}</pre>
        </div>
      </div>
      <div className={style.settings_buttons_container}>
        <input
          type="url"
          name=""
          id=""
          value={url}
          placeholder={"URL"}
          onChange={(e) => setUrl(e.target.value)}
        />
        <textarea
          name=""
          id=""
          value={body}
          placeholder={"URL"}
          onChange={(e) => setBody(e.target.value)}
        />
        <Button
          color={"blue"}
          onClick={() => {
            window.localStorage.setItem(
              "debug_req",
              JSON.stringify({
                url,
                body,
              })
            );
            setData("");
            try {
              const bodyObj = JSON.parse(body);
              axios
                .post(url, bodyObj)
                .then((data) => setData(JSON.stringify(data.data, null, " ")))
                .catch((e) => setData(JSON.stringify(e, null, " ")));
            } catch (e) {
              // eslint-disable-next-line no-alert
              alert(e);
            }
          }}
        >
          Send
        </Button>
      </div>
    </div>
  );
};
