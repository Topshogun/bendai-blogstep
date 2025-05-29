import React from 'react';
import { BlogAuthor } from '../../types/blog';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Globe } from 'lucide-react';

interface AuthorBioProps {
  author: BlogAuthor;
}

const AuthorBio = ({ author }: AuthorBioProps) => {
  return (
    <div className="bg-white/5 rounded-xl p-6">
      <div className="flex items-center gap-6">
        <img
          src={author.avatar}
          alt={author.name}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <Link
            to={`/blog/author/${author.id}`}
            className="text-xl font-semibold hover:text-blue-400 transition-colors"
          >
            {author.name}
          </Link>
          <p className="text-gray-400 mt-1">{author.role}</p>
          <div className="flex gap-4 mt-3">
            <a href="#" className="text-gray-400 hover:text-white">
              <Twitter size={18} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Linkedin size={18} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Globe size={18} />
            </a>
          </div>
        </div>
      </div>
      <p className="text-gray-300 mt-4">{author.bio}</p>
    </div>
  );
};

export default AuthorBio;