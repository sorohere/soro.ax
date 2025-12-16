import Image from "next/image";

export function MathsML() {
    return (
        <article className="prose prose-invert max-w-none">
            <h2>Maths and Machine Learning</h2>
            <p>
                Short on time? No problem. <br />Here’s the no-fluff resource list to get you right where you need to be.
            </p>
            <p>
                <strong>Disclaimer:</strong> These might not be the absolute best resources out there, and I haven’t mastered them all. They’re just the ones I’ve personally used and liked or were suggested by trusted folks.
            </p>

            <div className="my-8">
                <Image src="/images/bg02-01.png" alt="Maths of ML" width={800} height={400} className="rounded-lg w-full" />
                <p className="text-sm text-muted-foreground mt-2 text-center">
                    (source: <a href="https://towardsdatascience.com/the-mathematics-of-machine-learning-894f046c568" target="_blank" rel="noopener noreferrer">Wale Akinfaderin</a>)
                </p>
            </div>

            <p>
                I randomly stumbled upon this <a href="https://www.deeplearning.ai/courses/mathematics-for-machine-learning-and-data-science-specialization/" target="_blank" rel="noopener noreferrer">course</a> when I was just starting with ml math, and I’m so glad I did. It’s clear, structured, and focuses on what’s actually useful for ML. Since then, I’ve just been grinding through it and haven’t felt the need to check out other resources. That said, it was a paid course (and I know that’s not for everyone), so I’ll share some other solid and accessible resources below!
                <br /><br />This book is a must for a strong ML math foundation: <a href="https://mml-book.github.io/" target="_blank" rel="noopener noreferrer">Mathematics for Machine Learning.</a>
            </p>

            <h3>Linear Algebra:</h3>
            <p>
                Before jumping into advanced stuff, make sure you’ve got the basics down arithmetic, equations, and logarithms. They’re the foundation for everything else. <br /><br />You’ll also need to get familiar with vectors, matrices, determinants, and eigenvalues since they’re key to how ML models work. Prof. Gilbert Strang’s <a href="https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/video_galleries/video-lectures/" target="_blank" rel="noopener noreferrer">lectures</a> are a great way to make sense of it all.
            </p>

            <h3>Probability and Statistics:</h3>
            <p>
                To get the hang of machine learning, you need to know about random variables, Bayes’ theorem, distributions, hypothesis testing, probability theory, and inferential statistics. These basics are super useful for working with data and making solid predictions. <br /><br />Prof. John Tsitsiklis’s <a href="https://www.youtube.com/playlist?list=PLUl4u3cNGP61MdtwGTqZA0MreSaDybji8" target="_blank" rel="noopener noreferrer">lectures</a> were incredibly helpful for me in breaking down these topics and making them easier to understand.
            </p>

            <h3>Calculus:</h3>
            <p>
                Finally, up next is Calculus, where you'll tackle limits, derivatives, integrals, and how they apply to real-world problems. You’ll also dive into functions of several variables, covering partial derivatives, optimization, and gradient descent-essential for machine learning.
                <br /><br />The <a href="https://www.youtube.com/@ProfessorLeonard/playlists" target="_blank" rel="noopener noreferrer">lectures</a> from Prof. Leonard on YouTube were super helpful for me in grasping these concepts. They’re clear, engaging, and a great way to break down the tough stuff. And if you're looking for more hands-on practice, the resources on UrSide also offer some fantastic exercises to solidify your understanding.
            </p>

            <hr className="my-8 border-white/10" />

            <p>
                few recommended readings along with exercises to work on for each: <br />1.
                <a href="https://math.mit.edu/~gs/learningfromdata/" target="_blank" rel="noopener noreferrer">Linear Algebra and Learning from Data by Gilbert Strang</a>
                <br />2.
                <a href="https://github.com/peteflorence/MachineLearning6.867/blob/master/Bishop/Bishop%20-%20Pattern%20Recognition%20and%20Machine%20Learning.pdf" target="_blank" rel="noopener noreferrer">Pattern Recognition and Machine Learning by Christopher M. Bishop</a>
                <br />3.
                <a href="https://patemath.weebly.com/uploads/5/2/5/8/52589185/james-stewart-calculus-early-transcendentals-7th-edition-2012-1-20ng7to-1ck11on.pdf" target="_blank" rel="noopener noreferrer">Calculus for Machine Learning by Jason Boyd</a>
            </p>

            <p>
                <strong>Here’s the deal</strong>: It’s tempting to just memorize formulas, but the real magic happens when you understand how and why things work. Take vector calculus, for example it’s key to understanding gradient descent in machine learning. <br /><br /><strong>Quick Tip</strong>: When you’re learning solo, it’s easy to skip over things. Make sure to dive deep into each topic to avoid any knowledge gaps later on.
            </p>

            <p>Appreciate you reading to the end! :)</p>
        </article>
    );
}
