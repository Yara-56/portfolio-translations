import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const EditProject = () => {
  const { id } = useParams(); // Pega o ID do projeto pela URL
  const [project, setProject] = useState({
    title: '',
    description: '',
    // Adicione outros campos aqui, se necessário
  });

  useEffect(() => {
    // Pega os dados do projeto pelo ID
    supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data, error }) => {
        if (error) {
          console.error("Erro ao buscar o projeto:", error);
        } else {
          setProject(data);
        }
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Lógica para editar o projeto
    const { error } = await supabase
      .from('projects')
      .update({
        title: project.title,
        description: project.description,
        // Adicione outros campos do projeto aqui
      })
      .eq('id', id);
    if (error) {
      console.error("Erro ao editar o projeto:", error);
    } else {
      alert("Projeto atualizado com sucesso!");
    }
  };

  // Verificação condicional: se o projeto não estiver carregado, exibe mensagem de carregamento
  if (!project || !project.title) {
    return <p>Carregando projeto...</p>;
  }

  return (
    <div>
      <h1>Editar Projeto</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título</label>
          <input
            type="text"
            value={project.title}
            onChange={(e) => setProject({ ...project, title: e.target.value })}
          />
        </div>
        <div>
          <label>Descrição</label>
          <textarea
            value={project.description}
            onChange={(e) => setProject({ ...project, description: e.target.value })}
          />
        </div>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default EditProject;
