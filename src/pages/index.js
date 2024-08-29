import Link from "next/link";
import dbConnect from "../lib/dbConnect";
import Pet from "../models/Pet";
import Hours from '../components/Hours';

const Index = ({ pets }) => {
  return (
    <>
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <a
          href="https://github.com/gtello/wth-devops"
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#000',
            textDecoration: 'none',
            backgroundColor: '#f0f0f0',
            padding: '10px 20px',
            borderRadius: '5px',
            display: 'inline-block',
            transition: 'background-color 0.3s',
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#e0e0e0'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#f0f0f0'}
        >
          Link al Repo en Github
        </a>
      </div>

      <Hours />

      {/* Create a card for each pet */}
      {pets.map((pet) => (
        <div key={pet._id}>
          <div className="card">
            <img src={pet.image_url} />
            <h5 className="pet-name">{pet.name}</h5>
            <div className="main-content">
              <p className="pet-name">{pet.name}</p>
              <p className="owner">Owner: {pet.owner_name}</p>

              {/* Extra Pet Info: Likes and Dislikes */}
              <div className="likes info">
                <p className="label">Likes</p>
                <ul>
                  {pet.likes.map((data, index) => (
                    <li key={index}>{data} </li>
                  ))}
                </ul>
              </div>
              <div className="dislikes info">
                <p className="label">Dislikes</p>
                <ul>
                  {pet.dislikes.map((data, index) => (
                    <li key={index}>{data} </li>
                  ))}
                </ul>
              </div>

              <div className="btn-container">
                <Link href="/[id]/edit" as={`/${pet._id}/edit`}>
                  <button className="btn edit">Edit</button>
                </Link>
                <Link href="/[id]" as={`/${pet._id}`}>
                  <button className="btn view">View</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect();

  /* find all the data in our database */
  const result = await Pet.find({});
  const pets = result.map((doc) => {
    const pet = doc.toObject();
    pet._id = pet._id.toString();
    return pet;
  });

  return { props: { pets: pets } };
}

export default Index;
