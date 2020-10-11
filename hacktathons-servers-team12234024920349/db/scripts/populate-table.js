const { addRecipes } = require("../db");

const addSeedData = async () => {
  const seedData = [
    {
      title: "Beans on Toast",
      ingredients: ["150g of beans", "150g of butter", "150g of toast"],
      instructions: `Put the butter in your mouth, wait 2 seconds to allow slight melting. Then follow with the toast. Swish around for 10-15 seconds to allow even coating of butter on the toast. Then add the beans, slowly.
  
  Season to taste.`,
      image:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/beans-on-toast-1578934200.jpg?crop=1.00xw:0.751xh;0,0.151xh&resize=640:*",
    },
    {
      title: "Pizza",
      ingredients: ["Pre-made pizza base", "Tomato sauce", "Cheese"],
      instructions:
        "Layer the sauce over the base. Add some cheese on top. Put into preheated oven at 180 degrees Celsius for 30 minutes.",
      image:
        "https://slice.seriouseats.com/images/20110327-144755-Rudys-plain-whole.jpg",
    },
  ];
  await addRecipes(seedData);
};

module.exports = {
  addSeedData,
};

if (require.main === module) {
  addSeedData();
}
