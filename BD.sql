CREATE TABLE posts (
    id INT NOT NULL AUTO_INCREMENT,
    `desc` VARCHAR(200),
    img VARCHAR(200),
    userId INT NOT NULL,
    createdAt DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
CREATE TABLE `social`.`comments` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `desc` VARCHAR(200) NOT NULL,
    `createdAt` DATETIME NULL,
    `userId` INT NOT NULL,
    `postId` INT NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `userId_idx` (`userId` ASC) ,
    INDEX `postId_idx` (`postId` ASC) ,
    INDEX `commentUserId_idx` (`userId` ASC) ,
    CONSTRAINT `commentUserId`
        FOREIGN KEY (`userId`)
        REFERENCES `social`.`users` (`id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT `postId`
        FOREIGN KEY (`postId`)
        REFERENCES `social`.`posts` (`id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE `social`.`stories` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `img` VARCHAR(200) NOT NULL,
    `userId` INT NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) ,
    INDEX `storyUserId_idx` (`userId` ASC) ,
    CONSTRAINT `storyUserId`
        FOREIGN KEY (`userId`)
        REFERENCES `social`.`users` (`id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ;

CREATE TABLE `social`.`relationships` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `followerUserId` INT NOT NULL,
    `followedUserId` INT NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC),
    INDEX `followerUser_idx` (`followerUserId` ASC),
    INDEX `followedUser_idx` (`followedUserId` ASC) ,
    CONSTRAINT `followerUser`
        FOREIGN KEY (`followerUserId`)
        REFERENCES `social`.`users` (`id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT `followedUser`
        FOREIGN KEY (`followedUserId`)
        REFERENCES `social`.`users` (`id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE `social`.`likes` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `userId` INT NOT NULL,
    `postId` INT NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) ,
    INDEX `likeeUserId_idx` (`userId` ASC) ,
    INDEX `likePostId_idx` (`postId` ASC) ,
    CONSTRAINT `likeeUserId`
        FOREIGN KEY (`userId`)
        REFERENCES `social`.`users` (`id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT `likePostId`
        FOREIGN KEY (`postId`)
        REFERENCES `social`.`posts` (`id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) 

