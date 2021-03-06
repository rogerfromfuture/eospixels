const { eos } = require(`../config`)
const { getErrorDetail, sleep } = require(`../utils`)

const { EOS_CONTRACT_NAME, TESTER_NAME } = process.env

async function action() {
  let total = 1
  const perBatch = 1
  const perTx = 1
  const contract = await eos.contract(EOS_CONTRACT_NAME)
  while (total) {
    total -= perBatch
    let count = perBatch
    let nonce = 0
    const tx = []
    while (count) {
      tx.push(
        contract
          .clearcanvs(perTx, nonce, {
            authorization: TESTER_NAME,
            expireInSeconds: 15,
          })
          .catch((err) => {
            console.error(`${getErrorDetail(err)}`)
          }),
      )
      count -= perTx
      nonce++
    }
    console.log('SENT')

    await Promise.all(tx)

    console.log(`DONE`)
  }
  console.log(`ALL DONE`)
}

action()
