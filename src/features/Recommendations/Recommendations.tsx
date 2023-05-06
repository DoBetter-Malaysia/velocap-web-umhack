import { Loader, Table } from "@mantine/core";
import axios from "axios";
import { useState, useEffect } from "react";

const Recommendations = ({ id }: { id: number }) => {
  const [loading, setLoading] = useState(false);
  const [predictions, setPredictions] = useState<Array<{
    name: string;
    category_list: string;
  }> | null>(null);
  useEffect(() => {
    if (!id) {
      return;
    }
    setLoading(true);
    axios(`http://127.0.0.1:5000/recommend/${id}`).then((res) => {
      setPredictions(res.data);
      setLoading(false);
    });
  }, [id]);

  if (loading || !predictions) {
    return <Loader />;
  }

  return (
    <Table>
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Categories</th>
        </tr>
      </thead>
      <tbody className="text-md">
        {predictions?.map((p, key) => (
          <tr key={key}>
            <td>{key + 1}</td>
            <td className="font-bold text-blue-400">
              <a href="#">{p.name}</a>
            </td>
            <td>{p.category_list.split("|").slice(1).join(", ")}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Recommendations;
