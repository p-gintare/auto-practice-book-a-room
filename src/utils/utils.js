export async function wait(timeout){
    return await new Promise(resolve => setTimeout(resolve, timeout));
}

// arrow funkcija
export const wait2 = async (timeout) => await new Promise(resolve => setTimeout(resolve, timeout));