import React from "react";
import PropTypes from "prop-types";
import TableDropdown from "../../../components/Admin/Dropdowns/TableDropdown.jsx";

export default function CardTable({ color, posts, title }) {
  const isLight = color === "light";

  const headerClass =
    "px-6 py-3 text-xs uppercase font-semibold text-left border-b";
  const lightHeader = "bg-gray-100 text-gray-500 border-gray-200";
  const darkHeader = "bg-sky-800 text-sky-200 border-sky-700";

  const textColor = isLight ? "text-gray-800" : "text-gray-200";
  const borderColor = isLight ? "border-gray-200" : "border-sky-700";

  return (
    <div className={`relative flex flex-col w-full mb-6 shadow-lg rounded`}>
      {/* Header */}
      <div
        className={`rounded-t mb-0 px-4 py-3 border-b ${
          isLight ? "border-gray-200 bg-gray-100" : "border-sky-700 bg-sky-800"
        }`}
      >
        <div className="flex flex-wrap items-center">
          <div className="w-full px-4 max-w-full flex-grow flex-1">
            <h3
              className={`font-semibold text-lg ${
                isLight ? "text-gray-700" : "text-white"
              }`}
            >
              {title}
            </h3>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="block w-full overflow-x-auto">
        <table className="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
              {["User", "Company", "Content", "Created At", ""].map(
                (head, idx) => (
                  <th
                    key={idx}
                    className={`${headerClass} ${
                      isLight ? lightHeader : darkHeader
                    }`}
                  >
                    {head}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {posts.length > 0 ? (
              posts.map((post) => (
                <tr key={post.id}>
                  {/* User */}
                  <td
                    className={`border-t ${borderColor} px-6 py-4 text-xs text-left`}
                  >
                    {post.user?.name || "Unknown User"}
                  </td>

                  {/* Company */}
                  <td
                    className={`border-t ${borderColor} px-6 py-4 text-xs text-left`}
                  >
                    {post.company?.name || "-"}
                  </td>

                  {/* Content */}
                  <td
                    className={`border-t ${borderColor} px-6 py-4 text-xs text-left`}
                  >
                    {post.content}
                  </td>

                  {/* CreatedAt */}
                  <td
                    className={`border-t ${borderColor} px-6 py-4 text-xs text-left`}
                  >
                    {new Date(post.createdAt).toLocaleString()}
                  </td>

                  {/* Actions */}
                  <td
                    className={`border-t ${borderColor} px-6 py-4 text-xs text-right`}
                  >
                    <TableDropdown />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className={`border-t ${borderColor} px-6 py-4 text-xs text-center`}
                >
                  No posts available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

CardTable.defaultProps = {
  color: "light",
  posts: [],
  title: "Posts",
};

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
  posts: PropTypes.array.isRequired,
  title: PropTypes.string,
};
