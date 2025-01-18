"use client";
import {
  APIDeleteGroup,
  APIGetGroup,
  APIGetRules,
  APIPostGroupAdd,
  APIPatchGroupEdit,
} from "@/app/api";
import Button from "@/app/components/shared/Button/Button";
import Input from "@/app/components/shared/Input/Input";
import Titulo from "@/app/components/shared/Titulo/Titulo";
import { IGroup, IRule } from "@/app/types";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function Page() {
  const [rules, setRules] = useState<IRule[] | null>(null);
  const [selectedRules, setSelectedRules] = useState<string[]>([]);
  const [group, setGroup] = useState<IGroup[] | null>(null);
  const [formShow, setFormShow] = useState(false);

  const handleCheckboxChange = (ruleName: string) => {
    setSelectedRules(
      (prevSelected) =>
        prevSelected.includes(ruleName)
          ? prevSelected.filter((name) => name !== ruleName) // Remove se já estiver selecionado
          : [...prevSelected, ruleName] // Adiciona se não estiver selecionado
    );
  };

  async function loader() {
    const data = await APIGetGroup();
    setGroup(data);

    const data2 = await APIGetRules();
    setRules(data2);
  }

  useEffect(() => {
    loader();
  }, []);

  const [nome, setNome] = useState<string>("");
  const [id, setId] = useState<number>(0);

  const alterarNome = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNome(e.target.value);
  };

  function verificaInformacoesValidas() {
    if (nome === "" || selectedRules.length <= 0) return false;
    else return true;
  }

  async function handleSubmit() {
    const informacoesValidas: boolean = await verificaInformacoesValidas();

    if (informacoesValidas) {
      const data = {
        id: id,
        name: nome,
        rules: selectedRules,
      };

      let res = null;

      if (id === 0) {
        res = await APIPostGroupAdd(data);
      } else {
        res = await APIPatchGroupEdit(data);
      }

      console.log(res);
      if (res === 201) {
        setFormShow(false);
        loader();
      }
    } else {
      alert("Informe o nome de grupo e pelo menos uma permissão para gravar!");
    }
  }

  async function handleDelete(groupId: number) {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja deletar este grupo?"
    );
    if (confirmDelete) {
      const res = await APIDeleteGroup(groupId);
      if (res === 200) {
        alert("Grupo deletado com sucesso!");
        loader();
      } else {
        alert("Erro ao deletar o grupo.");
      }
    }
  }

  async function handleEdit(item: IGroup) {
    setId(item.id);
    setNome(item.name);
    // Pré-seleciona as regras associadas ao grupo
    setSelectedRules(item.rules.map((rule) => rule.name));
    setFormShow(true);
  }

  const handleCreateNew = () => {
    setId(0);
    setNome("");
    setSelectedRules([]); // Limpa as regras selecionadas ao criar um novo grupo
    setFormShow(true);
  };

  if (formShow) {
    return (
      <div className="bg-zinc-900 p-7 flex-1 mr-8 mb-8 rounded-lg">
        <div className="flex flex-1 justify-between">
          <div className="">
            <Titulo texto={id === 0 ? "Novo grupo" : "Editando grupo"} />
          </div>
          <div className="flex gap-2">
            <div className="w-[100px]">
              <Button tipo="button" cor="verde" onClick={handleSubmit}>
                Gravar
              </Button>
            </div>
            <div className="w-[100px]">
              <Button
                tipo="button"
                cor="vermelho"
                onClick={() => setFormShow(false)}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>

        <Input
          label="Grupo"
          IconeLadoEsquerdo={UserGroupIcon}
          tipo="text"
          tamanho={6}
          onChange={alterarNome}
          value={nome}
          disabled={id !== 0} // Desabilita o campo de nome ao editar
        />

        {rules && (
          <div className="mt-4">
            <div className="flex">
              <p className="font-bold">Permissões</p>
            </div>
            {rules.map((item) => (
              <div
                className="flex gap-2 cursor-pointer"
                key={item.id}
                onClick={() => handleCheckboxChange(item.name)}
              >
                <input
                  type="checkbox"
                  checked={selectedRules.includes(item.name)}
                />
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 p-7 flex-1 mr-8 mb-8 rounded-lg">
      <div className="flex flex-1 justify-between">
        <div className="">
          <Titulo texto="Grupos do sistema" />
        </div>
        <div className="w-[100px]">
          <Button tipo="button" cor="verde" onClick={handleCreateNew}>
            Novo
          </Button>
        </div>
      </div>

      {group && (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-zinc-900 text-left">
                <th className="px-4 py-2 border-b">ID</th>
                <th className="px-4 py-2 border-b">Grupo</th>
                <th className="px-4 py-2 border-b">Padrão</th>
                <th className="px-4 py-2 border-b">Ações</th>
              </tr>
            </thead>
            <tbody>
              {group.map((item: IGroup, index) => (
                <tr
                  key={item.id}
                  className={index % 2 === 0 ? "bg-black" : "bg-zinc-900"}
                >
                  <td className="px-4 py-2 border-b">{item.id}</td>
                  <td className="px-4 py-2 border-b">{item.name}</td>
                  <td className="px-4 py-2 border-b">
                    {item.isSystem ? "Sim" : "Não"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {!item.isSystem && (
                      <div className="flex gap-2">
                        <button type="button" onClick={() => handleEdit(item)}>
                          Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                        >
                          Deletar
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
