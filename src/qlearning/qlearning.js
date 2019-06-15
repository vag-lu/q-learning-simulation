
export default function QLearning (props) {
    const {
        stop, 
        qTable, 
        setQTable,
        epsilon,
        stateTable,
    } = this.props

    let newQTable = qTable
    let nextAction
    let actualState = stateTable.find()

    while(!stop){
        
        if(Math.random() < epsilon){
            nextAction = Math.floor(Math.random() * 4) + 1 
        }else{
            nextAction = 
        }
    }
}

findIsHereState(stateArray){
    
}