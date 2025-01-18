import axios from "axios";

const baseURL = "http://localhost:4000";

export async function APIPostChangePassword(data: any) {
  const token: string | null = localStorage.getItem("token");
  try {
    const response = await axios.post(
      `${baseURL}/auth/change-password`,
      {
        lastPassword: data.lastPassword,
        password: data.password,
        confirmPassword: data.confirmPassword,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    if (response.status === 204) {
      alert("Senha modificada com sucesso!");
      return response.status;
    } else {
      alert("Houve um erro ao modificar a senha!");
      return response.status;
    }
    // return response.data;
  } catch (error) {
    console.error(error);
    alert("Erro");
    return 0;
  }
}

export async function APIGetRules() {
  const token: string | null = localStorage.getItem("token");
  try {
    const response = await axios.get(`${baseURL}/auth/rule/get-all-rules`, {
      headers: {
        Authorization: token,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    alert("Erro");
    return;
  }
}

export async function APIGetGroup() {
  const token: string | null = localStorage.getItem("token");
  try {
    const response = await axios.get(`${baseURL}/auth/group/get-all-groups`, {
      headers: {
        Authorization: token,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    alert("Erro");
    return;
  }
}
export async function APIDeleteGroup(id: number) {
  const token: string | null = localStorage.getItem("token");
  try {
    const response = await axios.delete(
      `${baseURL}/auth/group/delete-group?id=${id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.status;
  } catch (error) {
    console.error(error);
    alert("Erro");
    return;
  }
}

export async function APIPostGroupAdd(data: any) {
  const token: string | null = localStorage.getItem("token");
  try {
    const response = await axios.post(
      `${baseURL}/auth/group/add`,
      {
        name: data.name,
        rules: data.rules,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    if (response.status === 201) {
      alert("Grupo criado com sucesso!");
      return response.status;
    } else {
      alert("Houve um erro ao criar um novo grupo!");
      return response.status;
    }
    // return response.data;
  } catch (error) {
    console.error(error);
    alert("Erro");
    return 0;
  }
}

export async function APIPatchGroupEdit(data: any) {
  const token: string | null = localStorage.getItem("token");
  try {
    const response = await axios.patch(
      `${baseURL}/auth/group/edit`,
      {
        id: data.id,
        // name: data.name,
        rules: data.rules,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    if (response.status === 201) {
      alert("Grupo editado com sucesso!");
      return response.status;
    } else {
      alert("Houve um erro ao editar um novo grupo!");
      return response.status;
    }
  } catch (error) {
    console.error(error);
    alert("Erro");
    return 0;
  }
}
