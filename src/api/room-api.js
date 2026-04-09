export const getRoomInformation = async (roomId) => {
    const response = await fetch(`https://automationintesting.online/api/report/room/${roomId}`, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    console.log(response.url);
    return await response.json();
}