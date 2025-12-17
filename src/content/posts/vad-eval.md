---
title: "The Art of Detecting Speech"
date: "2024-03-15"
---

## The Art of Detecting Speech

This post explores [my recent work](https://drive.google.com/file/d/1JeR6GuQ4KrDOmjwPcNsoJAUJVIcOYJHE/view?usp=sharing) on Voice Activity Detection (VAD). Rather than diving into technical stuff, the goal is to explain the concept in an easy way, with a touch of humor to keep it engaging. Let’s get into it!

### What’s the Big Deal with Voice Activity Detection?

Imagine you’re at a party, and you’re trying to listen to your friend’s story about their cat. But, oh no! The music is blasting, people are laughing, and someone just dropped a plate. How do you focus on your friend’s voice in all that chaos?

Well, that’s exactly what VAD does, it helps machines figure out when someone is speaking and when they’re not, even in noisy environments.

VAD is like the bouncer at a club, deciding who gets in (speech) and who stays out (noise). It’s a crucial part of speech processing systems, from voice assistants like [Siri](https://machinelearning.apple.com/research/voice-trigger) and [Alexa](https://developer.amazon.com/en-US/docs/alexa/ask-overviews/what-is-the-alexa-skills-kit.html) to transcription services and even call centers. But here’s the kicker not all VAD systems are created equal. Some are great at detecting speech, while others… well, let’s just say they need a bit more training.

### The Traditional vs. Modern Showdown

In my research, I looked at two main ways to evaluate VAD systems: traditional metrics and modern metrics. Think of it like judging a pizza: traditional metrics are like checking if the pizza has the right amount of cheese and toppings, while modern metrics are like tasting it to see if it’s actually delicious.

![Perceptron Diagram | half](/images/bg03-01.png)
measuring the cheese and toppings, a traditional way.

![Gradient Descent Diagram | half](/images/bg03-02.png)
consideration of boundaries of speech. (source: [newscientist.com](https://www.newscientist.com/))

**Traditional Metrics: The Cheese and Toppings**

Traditional metrics are all about numbers. They measure things like:

*   **[Precision](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.precision_score.html)**: How often the system correctly identifies speech.
*   **[Recall](https://scikit-learn.org/stable/auto_examples/model_selection/plot_precision_recall.html)**: How much speech the system actually catches.
*   **[F1-Score](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.f1_score.html)**: A balance between precision and recall (because who doesn’t love a good balance?).
*   **[Accuracy](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.accuracy_score.html)**: Overall, how good the system is at telling speech from noise.

These metrics are great, but they have a blind spot, they don’t care much about the boundaries of speech. Imagine if you were cutting a pizza, and you accidentally cut off a slice of the crust. Traditional metrics wouldn’t notice, but modern metrics definitely would.

**Modern Metrics: The Taste Test**

Modern metrics are more nuanced. They focus on things like:

*   **Front End Clipping [(FEC)](https://en.wikipedia.org/wiki/Voice_activity_detection#Performance_evaluation)**: When the system misses the start of a sentence (like cutting off the first bite of pizza).
*   **Mid-Speech Clipping [(MSC)](https://arrow.tudublin.ie/cgi/viewcontent.cgi?article=1162&context=scschcomcon)**: When the system cuts out parts of the middle of a sentence (like missing the gooey cheese in the middle).
*   **Over Hang [(OVER)](https://israelcohen.com/wp-content/uploads/2018/05/TASLP_June2013.pdf)**: When the system thinks noise is speech (like mistaking a pepper flake for a topping).
*   **Noise Detected as Speech [(NDS)](https://arxiv.org/pdf/2410.14509)**: When the system thinks background noise is speech (like thinking the sound of the oven is part of the pizza).

These metrics give us a better idea of how well the VAD system performs in real world scenarios, where things are messy and unpredictable: just like my kitchen when I’m trying to cook.

**The Datasets: Bhojpuri and Vani**

To test these VAD systems, I used two datasets: the [Bhojpuri dataset](https://github.com/shashwatup9k/bho-resources/tree/master) (because why not?) and the [Vani dataset](https://vaani.iisc.ac.in/#Data), which includes audio samples from nine different Indic languages. It’s like testing pizza in different cities, each place has its own unique flavor.

The results? Well, let’s just say some systems were like gourmet chefs, while others were more like college students trying to make ramen.

### The Winners and Losers

After running the tests, a few models stood out:

*   [Silero](https://github.com/snakers4/silero-vad): This model was the MVP in traditional metrics, acing precision, recall, and accuracy. It’s like the pizza chef who always gets the cheese-to-sauce ratio perfect.
*   [SpeechBrain](https://huggingface.co/speechbrain/vad-crdnn-libriparty): This one shined in modern metrics, especially in boundary detection. It’s like the chef who knows exactly when to take the pizza out of the oven—no burnt crusts here!
*   [Pyannote](https://huggingface.co/pyannote/voice-activity-detection) and [FunASR](https://huggingface.co/funasr/fsmn-vad): These models are solid performers, nothing groundbreaking, but definitely not slouches either. They’re like a dependable neighborhood pizza spot: not the best in town, but you’ll rarely be disappointed.

### The [SNR](https://speechprocessingbook.aalto.fi/Recognition/Voice_activity_detection.html#performance-in-noise-3db-4db-threshold) Experiment: Turning Up the Noise

To make things even more interesting, I added uneven noise to the audio samples (because who doesn’t love a challenge?). The goal was to see how well these VAD systems could handle real world noise levels.

![SNR Experiment](/images/bg03-03.png)

Spoiler alert: after a certain point, the systems got better, but there’s only so much noise they can handle before they start to crack, kind of like me trying to focus on a conversation while in sleepy af.

### The Takeaway: Which Model Should You Choose?

Choosing the right VAD system depends on your specific needs. Different models excel in different scenarios, from simple single-speaker audio to complex multi-speaker environments.

*   If you're working on a small project where your audio contains only a single speech segment, use FunASR.
*   If your audio has multiple speech segments with varying pitches, SpeechBrain and Silero are the best choices. If you can tolerate little loss, Pyanote can be used as well.
*   If your goal is speaker diarization: separating and identifying different speakers in an audio file, Pyannote is a strong choice.

![Model Comparison](/images/bg03-04.png)

The choice of a speech model depends on your use case. A voice assistant needs minimal FEC for smooth interactions. while lecture transcription requires handling multiple speakers and varying pitch SpeechBrain or Silero work well here. FunASR is great for single segment speech, while Pyanote can be used for diarization with some trade-offs. Choose based on accuracy, latency, and complexity.

### The ASR Comparison: When VAD Meets Its Match

I also compared the VAD systems with an Automatic Speech Recognition (ASR) model. Think of ASR as the ultimate pizza critic, it knows exactly where the speech starts and ends. The comparison revealed some interesting gaps, especially in how the VAD systems handled noise. It’s like realizing your favorite pizza place sometimes forgets to add the pepperoni.

### Final Thoughts

Voice Activity Detection might sound like a dry topic, but it’s actually pretty fascinating when you think about it. It’s all about teaching machines to listen like humans do, filtering out the noise and focusing on what matters. And just like with pizza, there’s no one-size-fits-all solution. It’s all about finding the right balance.

So, the next time you’re talking to Siri or Alexa, remember, there’s a whole world of VAD magic happening behind the scenes. And who knows? Maybe one day, VAD systems will be so good, they’ll even understand my terrible jokes.

Thanks for sticking around! Until next time, keep [listening](https://www.youtube.com/watch?v=OPf0YbXqDm0&list=PLGBuKfnErZlB3AThAEKz8_3kbYTocgfbB).
