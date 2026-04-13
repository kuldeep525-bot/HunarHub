import Groq from "groq-sdk";

export const chat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `Tu HunarHub ka AI assistant hai.
          HunarHub ek local services marketplace hai jahan 
          users electrician, plumber, carpenter book kar sakte hain.
          Agar user koi service dhundhe toh usse sahi category batao.
          Hindi aur English dono mein baat kar.
          Short aur helpful responses de.`,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const aiMessage = response.choices[0].message.content;

    return res.status(200).json({
      success: true,
      message: aiMessage,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
