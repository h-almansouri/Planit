

function GroupCircle({array}){

    const groups = array.map(g => <h1 key={g.id}>Group: {g.name}</h1>)

    return(
        <>
            {groups}
        </>
    )
}

export default GroupCircle