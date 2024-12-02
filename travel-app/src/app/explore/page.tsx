import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Topbar from "../components/Topbar";

const suggestions = [
  {
    name: "Calgary Tower",
    description: "The Calgary Tower is a 190.8-metre free standing observation tower.",
    address: "101 9 Ave SW, Calgary AB T2P 1J9",
    imageUrl: "/images/Calgary_Tower.jpg"
  },
  {
    name: "Bowness Park",
    description: "Bowness Park is a scenic Calgary park with seasonal boating and skating.",
    address: "8900 48 Ave NW, Calgary AB T3B2B3",
    imageUrl: "/images/Bowness_Park.jpg"
  },
  {
    name: "Peace Bridge",
    description: "Peace Bridge is a bridge across the Bow River. The bridge was designed by Spanish architect Santiago Calatrava",
    address: "916 Memorial Dr NW, Calgary AB T2N",
    imageUrl: "/images/peace_bridge.jpg"
  },
  {
    name: "Calgary Zoo",
    description: "Home to a wide array of animals and habitats, including a prominent penguin facility.",
    address: "",
    imageUrl: "/images/calgary_zoo.jpg"
  },
  {
    name: "Glenbow Museum",
    description: "Explore art and history with a vast collection of cultural artifacts and international exhibitions",
    address: "",
    imageUrl: "/images/glenbow_museum.jpg"
  },
  {
    name: "Prince's Island Park",
    description: "A green oasis in downtown Calgary offering trails, wetlands, and spaces for outdoor events",
    address: "",
    imageUrl: "/images/prince_park.jpg"
  }
];

export default function ExplorePage() {
  return (
    <div>
      <Topbar />
      <div style={{ marginTop: '75px', marginLeft: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#000', marginBottom: '10px' }}>Explore:</h2>
      </div>
      <SearchBar />
      
      {/* Different Explore options */}
      <div style={{ padding: '20px' }}>
        {suggestions.map((suggestion, index) => (
          <div key={index} style={{
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: '#e5f2ff',
            borderRadius: '15px',
            marginBottom: '20px',
            overflow: 'hidden',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            position: 'relative',
            color: 'black',
          }}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <img src={suggestion.imageUrl} alt={suggestion.name} style={{
                width: '150px',
                height: '200px',
                objectFit: 'cover'
              }} />
            </div>
            <div style={{ paddingLeft: '20px', display:'flex', flexDirection:'column', justifyContent:'center' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '5px' }}>{suggestion.name}</h3>
              <p style={{ color: '#5a5a5a', padding: '2px' }}>{suggestion.description}</p>
            </div>
          </div>
        ))}
      </div>
      <Navbar />
    </div>
  );
}