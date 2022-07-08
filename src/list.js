
function NumberList(props){
    const listItems =  props.numbers.map((number, index)=>{
            return <ListItem key={index} number={number} />
    });
    
    return (
       <ul>{listItems}</ul>
    );
}

function ListItem(props){
 return (
    <li>{props.number}</li>
 );   
}

export default NumberList;