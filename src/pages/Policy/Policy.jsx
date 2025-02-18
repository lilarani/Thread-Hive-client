import useAuth from '../../hooks/useAuth';
import darkImg from '../../assets/Images/policyDark.png';

const Policy = () => {
  const { theme } = useAuth();
  return (
    <div className="mt-14">
      <div className="text-center">
        <h2 className="text-base md:text-3xl font-bold">Policy </h2>
        <p
          className={`font-semibold text-base ${
            theme === 'dark' ? 'text-gray-400' : ''
          }`}
        >
          Welcome to our policy page. Here you can find all the necessary
          information regarding our terms and conditions.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-14">
        <div>
          <p className="mb-4">
            We are committed to protecting your personal information and your
            right to privacy.
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum non
            sint incidunt, iste consectetur ipsam saepe soluta fugiat officiis.
            Voluptas atque, odit aliquam non exercitationem labore quia ex,
            ratione quam nostrum quibusdam dicta. Architecto impedit vero, velit
            magni natus cum eligendi perspiciatis vel quasi facere. Tempore
            deserunt, quia repellat exercitationem, fugiat aspernatur facere ad,
            laboriosam magnam quod porro et! Inventore minus excepturi iusto.
            Non nemo dolorem, eum minus nam et necessitatibus repellat culpa
            perferendis, error repudiandae quam itaque amet quia nobis
            veritatis? Autem illum error pariatur alias quas. Labore nobis
            impedit odit deleniti libero eveniet nostrum eligendi? Illum
            incidunt architecto assumenda. Nihil, impedit, odit possimus
            quibusdam facilis cum doloribus laborum voluptas molestiae quisquam
            ullam at minus soluta labore ipsam necessitatibus quo officiis
            accusantium distinctio eum cumque fugit vero fugiat. Provident
            quidem hic ex eaque a ea laborum voluptatibus. Aut impedit dolore
            suscipit quas perferendis hic non? Corporis hic minima eveniet odio
            veniam cupiditate, ullam tempore dolore nihil nesciunt, ad, quis
            deleniti esse aspernatur. Animi quasi itaque quo distinctio iusto
            accusantium quam reprehenderit nobis, quod fugiat quas ipsa eius est
            blanditiis omnis ratione alias facere rem deserunt autem iste ad
            soluta veniam voluptas! Aut quo laborum ipsum ullam, quae ab
            obcaecati.
          </p>
        </div>

        <div>
          <img className="w-96 h-96" src={darkImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Policy;
