"use client";
import { APIGetRules } from "@/app/api";
import Titulo from "@/app/components/shared/Titulo/Titulo";
import { IRule } from "@/app/types";
import { useEffect, useState } from "react";

export default function Page() {
  const [rules, setRules] = useState<IRule[] | null>(null);

  useEffect(() => {
    async function loader() {
      const data = await APIGetRules();
      setRules(data);
    }

    loader();
  }, []);

  return (
    <div className="bg-zinc-900 p-7 flex-1 mr-8 mb-8 rounded-lg">
      <Titulo texto="Permissões do sistema" />

      {/* {rules && (
        <div>
          {rules.map((item) => (
            <p>{item.name}</p>
          ))}
        </div>
      )} */}

      {rules && (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-zinc-900 text-left">
                <th className="px-4 py-2 border-b">ID</th>
                <th className="px-4 py-2 border-b">Permissão</th>
              </tr>
            </thead>
            <tbody>
              {rules.map((item: IRule, index) => (
                <tr
                  key={item.id}
                  className={index % 2 === 0 ? "bg-black" : "bg-zinc-900"}
                >
                  <td className="px-4 py-2 border-b">{item.id}</td>
                  <td className="px-4 py-2 border-b">{item.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
