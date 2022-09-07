
import { useRouter } from "next/router";


function Create() {
  const router = useRouter();

  const getSnippet = async () => {

    await fetch('http://localhost:3000/api/snippets/retrieve', {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json',
      },

    }).then(async (res) => {

      let obj = await res.json();
      console.log(obj);

    }
    )
  }


  return (
    <div>
      <button>
        <a onClick={getSnippet}>Get Snippet</a>
      </button>
    </div>
  )
}

export default Create;
